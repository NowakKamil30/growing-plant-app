package com.growingplantapp.controllers;

import com.growingplantapp.DTOs.WeatherDTO;
import com.growingplantapp.entities.Weather;
import com.growingplantapp.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/weather")
public class WeatherController {

    private final WeatherService weatherService;

    @Autowired
    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeatherDTO> getWeatherById(@PathVariable Long id) {
        return weatherService.getById(id)
                .map(weather -> new WeatherDTO(weather))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping()
    public ResponseEntity<List<WeatherDTO>> getAllWeather() {
        return ResponseEntity.ok(weatherService.getAll()
                .stream()
                .map(WeatherDTO::new)
                .collect(Collectors.toList()));
    }

    @GetMapping("/device/{id}")
    public ResponseEntity<List<WeatherDTO>> getAllWeatherById(
            @PathVariable Long id,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                    LocalDateTime start,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                    LocalDateTime stop) {
        return ResponseEntity.ok(weatherService.getAllByDeviceBetweenData(start, stop, id)
                .stream()
                .map(WeatherDTO::new)
                .collect(Collectors.toList()));
    }
}
