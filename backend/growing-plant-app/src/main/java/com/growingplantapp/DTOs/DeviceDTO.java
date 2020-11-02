package com.growingplantapp.DTOs;

import java.util.List;

public class DeviceDTO {
    private Long id;
    private String name;
    private Long userId;
    private double Latitude;
    private double Longitude;
    private List<Long> plantsId;
    private List<Long> weathersId;
    private Long typeDeviceId;

    public DeviceDTO() {
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getLatitude() {
        return Latitude;
    }

    public void setLatitude(double latitude) {
        Latitude = latitude;
    }

    public double getLongitude() {
        return Longitude;
    }

    public void setLongitude(double longitude) {
        Longitude = longitude;
    }

    public List<Long> getPlantsId() {
        return plantsId;
    }

    public void setPlantsId(List<Long> plantsId) {
        this.plantsId = plantsId;
    }

    public List<Long> getWeathersId() {
        return weathersId;
    }

    public void setWeathersId(List<Long> weathersId) {
        this.weathersId = weathersId;
    }

    public Long getTypeDeviceId() {
        return typeDeviceId;
    }

    public void setTypeDeviceId(Long typeDeviceId) {
        this.typeDeviceId = typeDeviceId;
    }
}
