package com.example.backend.service;

import com.example.backend.model.Tip;
import com.example.backend.repository.TipRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TipService {
    private final TipRepository tipRepository;

    public TipService(TipRepository tipRepository) {
        this.tipRepository = tipRepository;
    }

    public Tip addTip(Tip tip) {
        return tipRepository.save(tip);
    }

    public List<Tip> getAllTips() {
        return tipRepository.findAll();
    }

    public Tip updateTip(String id, Tip updatedTip) {
        Tip existing = tipRepository.findById(id).orElseThrow();
        existing.setTitle(updatedTip.getTitle());
        existing.setContent(updatedTip.getContent());
        existing.setCategory(updatedTip.getCategory());
        return tipRepository.save(existing);
    }

    public void deleteTip(String id) {
        tipRepository.deleteById(id);
    }

    public List<Tip> getByCategory(String category) {
        return tipRepository.findByCategory(category);
    }

    public List<Tip> searchTips(String title) {
        return tipRepository.findByTitleContainingIgnoreCase(title);
    }

    public Tip rateTip(String id, int rating) {
        Tip tip = tipRepository.findById(id).orElseThrow();
        tip.setRating((tip.getRating() * tip.getRatingCount() + rating) / (tip.getRatingCount() + 1));
        tip.setRatingCount(tip.getRatingCount() + 1);
        return tipRepository.save(tip);
    }
}
