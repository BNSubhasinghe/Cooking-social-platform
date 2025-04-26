package com.example.backend.controller;

import com.example.backend.model.Tip;
import com.example.backend.service.TipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tips")
@CrossOrigin
public class TipController {

    private final TipService tipService;

    public TipController(TipService tipService) {
        this.tipService = tipService;
    }

    // 1. Add a new tip
    @PostMapping
    public Tip addTip(@RequestBody Tip tip) {
        return tipService.addTip(tip);
    }

    // 2. Get all tips
    @GetMapping
    public List<Tip> getAllTips() {
        return tipService.getAllTips();
    }

    // 3. Update a tip
    @PutMapping("/{id}")
    public Tip updateTip(@PathVariable String id, @RequestBody Tip tip) {
        return tipService.updateTip(id, tip);
    }

    // 4. Delete a tip
    @DeleteMapping("/{id}")
    public void deleteTip(@PathVariable String id) {
        tipService.deleteTip(id);
    }

    // 5. Filter by category
    @GetMapping("/category/{category}")
    public List<Tip> getByCategory(@PathVariable String category) {
        return tipService.getByCategory(category);
    }

    // 6. Search by title (contains)
    @GetMapping("/search")
    public List<Tip> searchTips(@RequestParam String title) {
        return tipService.searchTips(title);
    }

    // 7. Rate a tip
    @PutMapping("/rate/{id}")
    public Tip rateTip(@PathVariable String id, @RequestParam int rating) {
        return tipService.rateTip(id, rating);
    }
}
