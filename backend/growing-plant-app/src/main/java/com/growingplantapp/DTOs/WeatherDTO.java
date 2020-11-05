package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.Weather;

import java.time.LocalDateTime;

public class WeatherDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private int temperature;
    @JsonView(Views.Public.class)
    private int rain;
    @JsonView(Views.Public.class)
    private int insolation;
    @JsonView(Views.Public.class)
    private LocalDateTime localDateTime;
    @JsonView(Views.Private.class)
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
