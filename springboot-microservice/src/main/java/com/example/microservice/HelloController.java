package com.example.microservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class HelloController {

  @Value("${app.message:Hello from Spring Boot}")
  private String message;

  @GetMapping("/api/hello")
  public Map<String, Object> hello(@RequestHeader(value = "X-Request-ID", required = false) String requestId) {
    return Map.of(
        "message", message,
        "timestamp", Instant.now().toString(),
        "requestId", requestId == null ? "none" : requestId,
        "service", "springboot-microservice"
    );
  }
}
