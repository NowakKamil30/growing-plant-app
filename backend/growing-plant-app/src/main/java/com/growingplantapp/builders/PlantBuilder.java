package com.growingplantapp.builders;

import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.GrowingCondition;
import com.growingplantapp.entities.Plant;

public final class PlantBuilder {
    private Long id;
    private String name;
    private Device device;
    private GrowingCondition growingCondition;

    private PlantBuilder() {
    }

    public static PlantBuilder aPlant() {
        return new PlantBuilder();
    }

    public PlantBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public PlantBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public PlantBuilder withDevice(Device device) {
        this.device = device;
        return this;
    }

    public PlantBuilder withGrowingCondition(GrowingCondition growingCondition) {
        this.growingCondition = growingCondition;
        return this;
    }

    public Plant build() {
        Plant plant = new Plant();
        plant.setId(id);
        plant.setName(name);
        plant.setDevice(device);
        plant.setGrowingCondition(growingCondition);
        return plant;
    }
}
