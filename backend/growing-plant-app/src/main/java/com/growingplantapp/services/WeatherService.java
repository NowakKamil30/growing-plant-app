package com.growingplantapp.services;

import com.growingplantapp.entities.Weather;
import com.growingplantapp.repositories.WeatherRepository;
import com.growingplantapp.services.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WeatherService implements CRUDService<Weather, Long> {

    final WeatherRepository weatherRepository;

    @Autowired
    public WeatherService(WeatherRepository weatherRepository) {
        this.weatherRepository = weatherRepository;
    }

    @Override
    public Optional<Weather> getById(Long aLong) {
        return weatherRepository.findById(aLong);
    }

    @Override
    public List<Weather> getAll() {
        return weatherRepository.findAll();
    }

    public List<Weather> getAllByDevice(Long id) {
        return weatherRepository.getAllByDevice_Id(id);
    }

    public List<Weather> getAllByDeviceBetweenData(LocalDateTime start, LocalDateTime stop, Long deviceId) {
        return weatherRepository.getAllByLocalDateTimeBetweenAndDevice_Id(start, stop, deviceId);
    }

    @Override
    public void add(Weather weather) {
        weatherRepository.save(weather);
    }

    @Override
    public void deleteById(Long aLong) {
        weatherRepository.deleteById(aLong);
    }

    @Override
    public void update(Long aLong, Weather weather) {
        weather.setId(aLong);
        weatherRepository.save(weather);
    }
}
