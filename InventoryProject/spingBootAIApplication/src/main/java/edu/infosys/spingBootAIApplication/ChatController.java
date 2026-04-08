package edu.infosys.spingBootAIApplication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3030", allowCredentials = "true")
public class ChatController {
	private final ChatService chatService;
	public ChatController(ChatService chatService) {
		this.chatService = chatService;
		}
	
	@PostMapping ("/chat")
	public String setChatRequest(@RequestBody ChatRequest request) {
		String message= chatService.getResponse(request).getGeneratedText();
		return message;
	}
}
