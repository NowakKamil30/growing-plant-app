package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.Plant;

public class PlantDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private String name;
    @JsonView(Views.Private.class)
    private Long deviceId;
    @JsonView(Views.Private.class)
    private Long growingConditionId;

    public PlantDTO() {

    }

    public PlantDTO(Plant plant) {
        this.id = plant.getId();
        this.name = plant.getName();
        this.deviceId = plant.getDevice().getId();
        this.growingConditionId = plant
                .getGrowingCondition()
                .getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public Long getGrowingConditionId() {
        return growingConditionId;
    }

    public void setGrowingConditionId(Long growingConditionId) {
        this.growingConditionId = growingConditionId;
    }
}