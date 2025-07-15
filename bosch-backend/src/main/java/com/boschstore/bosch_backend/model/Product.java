package com.boschstore.bosch_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.List;
import java.util.Map;

@Entity
public class Product {

    @Id
    private String id;
    @NotBlank(message = "Name is required.")
    private String name;
    @Positive(message = "Price must be greater than 0.")
    private double price;
    @NotBlank(message = "Short product description is required.")
    private String shortDescription;
    private String fullDescription;

    @ElementCollection
    @CollectionTable(name = "product_images",joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images;

    @ElementCollection
    @CollectionTable(name = "product_specifications",joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "spec_key")
    @Column(name = "spec_value")
    private Map<String, String> technicalSpecifications;

    public Product() {
    }

    public Product(String id, String name, double price, String shortDescription, String fullDescription, List<String> images, Map<String, String> technicalSpecifications) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.images = images;
        this.technicalSpecifications = technicalSpecifications;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Map<String, String> getTechnicalSpecifications() {
        return technicalSpecifications;
    }

    public void setTechnicalSpecifications(Map<String, String> technicalSpecifications) {
        this.technicalSpecifications = technicalSpecifications;
    }
}
