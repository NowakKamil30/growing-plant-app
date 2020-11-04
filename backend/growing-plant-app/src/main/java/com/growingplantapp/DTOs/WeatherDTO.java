package com.growingplantapp.DTOs;

import com.growingplantapp.entities.Weather;

import java.time.LocalDateTime;

public class WeatherDTO {
    private Long id;
    private int temperature;
    private int rain;
    private int insolation;
    private LocalDateTime localDateTime;
    private Long deviceId;

    public WeatherDTO() {

    }
    public WeatherDTO(Weather weather) {
        this.id = weather.getId();
        this.temperature = weather.getTemperature();
        this.rain = weather.getRain();
        this.insolation = weather.getInsolation();
        this.localDateTime = weather.getLocalDateTime();
        this.deviceId = weather.getDevice().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTemperature() {
        return temperature;
    }

    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }

    public int getRain() {
        return rain;
    }

    public void setRain(int rain) {
        this.rain = rain;
    }

    public int getInsolation() {
        return insolation;
    }

    public void setInsolation(int insolation) {
        this.insolation = insolation;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }
}
