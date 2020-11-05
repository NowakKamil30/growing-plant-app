package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.GrowingCondition;

public class GrowingConditionDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private int irrigation;
    @JsonView(Views.Public.class)
    private int insolation;
    @JsonView(Views.Public.class)
    private int timeOfGrowth;
    @JsonView(Views.Public.class)
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
