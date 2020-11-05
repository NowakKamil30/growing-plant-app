package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.Plant;
import com.growingplantapp.entities.Weather;

import java.util.List;
import java.util.stream.Collectors;

public class DeviceDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private String name;
    @JsonView(Views.Private.class)
    private Long userId;
    @JsonView(Views.Public.class)
    private double Latitute;
    @JsonView(Views.Public.class)
    private double Longitude;
    @JsonView(Views.Private.class)
    private List<Long> plantsId;
    @JsonView(Views.Private.class)
    private List<Long> weathersId;
    @JsonView(Views.Private.class)
    private Long typeDeviceId;
    @JsonView(Views.Public.class)
    private boolean isActive;


    public DeviceDTO() {

    }

    public DeviceDTO(Device device) {
        this.id = device.getId();
        this.name = device.getName();
        this.userId = device.getUser().getId();
        this.Latitute = device.getLatitude();
        this.Longitude = device.getLongitude();
        this.plantsId = device.getPlants()
                .stream()
                .map(Plant::getId)
                .collect(Collectors.toList());
        this.weathersId = device.getWeathers()
                .stream()
                .map(Weather::getId)
                .collect(Collectors.toList());
        this.typeDeviceId = device.getTypeDevice().getId();
        this.isActive = device.isActive();
    }





    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setLatitute(double latitute) {
        Latitute = latitute;
    }

    public void setLongitude(double longitude) {
        Longitude = longitude;
    }

    public void setPlantsId(List<Long> plantsId) {
        this.plantsId = plantsId;
    }

    public void setWeathersId(List<Long> weathersId) {
        this.weathersId = weathersId;
    }

    public void setTypeDeviceId(Long typeDeviceId) {
        this.typeDeviceId = typeDeviceId;
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getUserId() {
        return userId;
    }

    public double getLatitute() {
        return Latitute;
    }

    public double getLongitude() {
        return Longitude;
    }

    public List<Long> getPlantsId() {
        return plantsId;
    }

    public List<Long> getWeathersId() {
        return weathersId;
    }

    public Long getTypeDeviceId() {
        return typeDeviceId;
    }


}
