package edu.infosys.spingBootAIApplication;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ChatService {
	@Value("${huggingface.api.url}")
    private String apiUrl;
    @Value("${huggingface.api.key}")
    private String apiKey;
    @Value("${huggingface.model.id}")
    private String modelId;
 
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
 
    public ChatResponse getResponse(ChatRequest request) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);
 
            // 1. Build the payload exactly like your successful Postman test
            Map<String, Object> payload = new HashMap<>();
            payload.put("model", modelId);
            
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "user", "content", request.getInputs()));
            payload.put("messages", messages);
            payload.put("max_tokens", 500);
 
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
 
            // 2. Make the call
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);
            
            // 3. Parse the nested structure: choices[0].message.content
            JsonNode root = objectMapper.readTree(response.getBody());
            
            // Using .path() is safer than .get() as it avoids NullPointerExceptions
            String resultText = root.path("choices")
                                   .get(0)
                                   .path("message")
                                   .path("content")
                                   .asText();
 
            return new ChatResponse(resultText);
 
        } catch (Exception e) {
            return new ChatResponse("Error logic: " + e.getMessage());
        }
    }
}
