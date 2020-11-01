package com.growingplantapp.builders;

import com.growingplantapp.entities.Weather;

import java.time.LocalDateTime;

public final class WeatherBuilder {
    private Long id;
    private int temperature;
    private int rain;
    private int insolation;
    private LocalDateTime localDateTime;

    private WeatherBuilder() {
    }

    public static WeatherBuilder aWeather() {
        return new WeatherBuilder();
    }

    public WeatherBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public WeatherBuilder withTemperature(int temperature) {
        this.temperature = temperature;
        return this;
    }

    public WeatherBuilder withRain(int rain) {
        this.rain = rain;
        return this;
    }

    public WeatherBuilder withInsolation(int insolation) {
        this.insolation = insolation;
        return this;
    }

    public WeatherBuilder withLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
        return this;
    }

    public Weather build() {
        Weather weather = new Weather();
        weather.setId(id);
        weather.setTemperature(temperature);
        weather.setRain(rain);
        weather.setInsolation(insolation);
        weather.setLocalDateTime(localDateTime);
        return weather;
    }
}
