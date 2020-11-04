package com.growingplantapp.DTOs;

import com.growingplantapp.entities.Plant;

public class PlantDTO {
    private Long id;
    private String name;
    private Long deviceId;
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