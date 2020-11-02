package com.growingplantapp.entities;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
public class GrowingCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private int irrigation;
    private int insolation;
    private int timeOfGrowth;
    @NotEmpty
    private String color;

    public GrowingCondition() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getIrrigation() {
        return irrigation;
    }

    public void setIrrigation(int irrigation) {
        this.irrigation = irrigation;
    }

    public int getInsolation() {
        return insolation;
    }

    public void setInsolation(int insolation) {
        this.insolation = insolation;
    }

    public int getTimeOfGrowth() {
        return timeOfGrowth;
    }

    public void setTimeOfGrowth(int timeOfGrowth) {
        this.timeOfGrowth = timeOfGrowth;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
