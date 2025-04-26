package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.Tip;

import java.util.List;

public interface TipRepository extends MongoRepository<Tip, String> {
    List<Tip> findByCategory(String category);
    List<Tip> findByTitleContainingIgnoreCase(String title);
}
