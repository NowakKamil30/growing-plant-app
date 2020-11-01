package com.growingplantapp.builders;

import com.growingplantapp.entities.GrowingCondition;

public final class GrowingConditionBuilder {
    private Long id;
    private int irrigation;
    private int insolation;
    private int timeOfGrowth;
    private String color;

    private GrowingConditionBuilder() {
    }

    public static GrowingConditionBuilder aGrowingCondition() {
        return new GrowingConditionBuilder();
    }

    public GrowingConditionBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public GrowingConditionBuilder withIrrigation(int irrigation) {
        this.irrigation = irrigation;
        return this;
    }

    public GrowingConditionBuilder withInsolation(int insolation) {
        this.insolation = insolation;
        return this;
    }

    public GrowingConditionBuilder withTimeOfGrowth(int timeOfGrowth) {
        this.timeOfGrowth = timeOfGrowth;
        return this;
    }

    public GrowingConditionBuilder withColor(String color) {
        this.color = color;
        return this;
    }

    public GrowingCondition build() {
        GrowingCondition growingCondition = new GrowingCondition();
        growingCondition.setId(id);
        growingCondition.setIrrigation(irrigation);
        growingCondition.setInsolation(insolation);
        growingCondition.setTimeOfGrowth(timeOfGrowth);
        growingCondition.setColor(color);
        return growingCondition;
    }
}
