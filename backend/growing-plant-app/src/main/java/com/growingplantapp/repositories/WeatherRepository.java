package com.growingplantapp.repositories;

import com.growingplantapp.entities.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long> {
    List<Weather> getAllByDevice_Id(Long id);
    List<Weather> getAllByLocalDateTimeBetweenAndDevice_Id(LocalDateTime start, LocalDateTime stop, Long deviceId);
}
