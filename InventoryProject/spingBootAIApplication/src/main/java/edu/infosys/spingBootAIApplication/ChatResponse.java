package edu.infosys.spingBootAIApplication;

public class ChatResponse {

	private String generatedText;

	public ChatResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChatResponse(String generatedText) {
		super();
		this.generatedText = generatedText;
	}

	public String getGeneratedText() {
		return generatedText;
	}

	public void setGeneratedText(String generatedText) {
		this.generatedText = generatedText;
	}
}
