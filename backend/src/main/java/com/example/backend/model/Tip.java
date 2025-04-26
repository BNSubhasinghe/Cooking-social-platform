package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "tips")
@Data
public class Tip {
        @Id
        private String id;
        private String title;
        private String content;
        private String category; // Storage, Prep, Substitutes
        private double rating = 0;
        private int ratingCount = 0;
        private String userId;
}
