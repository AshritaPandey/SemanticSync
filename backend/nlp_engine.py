import torch
from sentence_transformers import SentenceTransformer, util
import numpy as np
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer

class NLPEngine:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        # Small and fast model (~80MB)
        print(f"Loading transformer model {model_name}...")
        self.model = SentenceTransformer(model_name)
        
        # Load spaCy for linguistic analysis
        try:
            print("Loading spaCy model...")
            self.nlp_spacy = spacy.load('en_core_web_sm')
        except:
            print("spaCy model not found, downloading...")
            import os
            os.system('python -m spacy download en_core_web_sm')
            self.nlp_spacy = spacy.load('en_core_web_sm')
        
        print("NLP Engine ready.")

    def get_similarity(self, sentence1, sentence2):
        # Compute embeddings
        embeddings1 = self.model.encode(sentence1, convert_to_tensor=True)
        embeddings2 = self.model.encode(sentence2, convert_to_tensor=True)
        
        # Compute cosine similarity
        cosine_score = util.cos_sim(embeddings1, embeddings2)
        return float(cosine_score[0][0])

    def get_word_alignment(self, sentence1, sentence2):
        # Tokenize by splitting
        tokens1 = sentence1.split()
        tokens2 = sentence2.split()
        
        if not tokens1 or not tokens2:
            return []

        emb1 = self.model.encode(tokens1, convert_to_tensor=True)
        emb2 = self.model.encode(tokens2, convert_to_tensor=True)
        
        sim_matrix = util.cos_sim(emb1, emb2)
        
        alignments = []
        for i, t1 in enumerate(tokens1):
            max_sim = float(torch.max(sim_matrix[i]))
            if max_sim > 0.6:
                best_match_idx = int(torch.argmax(sim_matrix[i]))
                alignments.append({
                    "word1": t1,
                    "word2": tokens2[best_match_idx],
                    "score": max_sim,
                    "idx1": i,
                    "idx2": best_match_idx
                })
        return alignments

    def get_tfidf_similarity(self, sentence1, sentence2):
        """
        Calculates lexical similarity using TF-IDF Vectorization.
        This represents the 'Traditional' NLP approach (GloVe/Word2Vec base).
        """
        try:
            vectorizer = TfidfVectorizer()
            tfidf_matrix = vectorizer.fit_transform([sentence1, sentence2])
            # The matrix has 2 rows (S1, S2). Dot product = similarity.
            sim = (tfidf_matrix[0] * tfidf_matrix[1].T).toarray()[0][0]
            return float(sim)
        except:
            # Fallback if sentences are too short/empty
            return 0.0

    def get_linguistic_data(self, sentence):
        doc = self.nlp_spacy(sentence)
        
        # Extract Entities
        entities = []
        for ent in doc.ents:
            entities.append({
                "text": ent.text,
                "label": ent.label_,
                "description": spacy.explain(ent.label_)
            })
            
        # Extract POS Tags
        pos_tags = []
        for token in doc:
            pos_tags.append({
                "text": token.text,
                "pos": token.pos_,
                "tag": token.tag_,
                "explanation": spacy.explain(token.tag_)
            })
            
        # Extract Keywords (Nouns and Adjectives)
        keywords = [token.text for token in doc if token.pos_ in ['NOUN', 'PROPN', 'ADJ'] and not token.is_stop]
        
        return {
            "entities": entities,
            "pos_tags": pos_tags,
            "keywords": list(set(keywords))
        }

nlp = NLPEngine()
