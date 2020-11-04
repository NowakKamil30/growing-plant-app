package com.growingplantapp.DTOs;

import com.growingplantapp.entities.GrowingCondition;

public class GrowingConditionDTO {
    private Long id;
    private int irrigation;
    private int insolation;
    private int timeOfGrowth;
    private String color;

    public GrowingConditionDTO()
    {

    }

    public GrowingConditionDTO(GrowingCondition growingCondition)
    {
        this.id = growingCondition.getId();
        this.irrigation = growingCondition.getIrrigation();
        this.insolation = growingCondition.getInsolation();
        this.timeOfGrowth = growingCondition.getTimeOfGrowth();
        this.color = growingCondition.getColor();
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
