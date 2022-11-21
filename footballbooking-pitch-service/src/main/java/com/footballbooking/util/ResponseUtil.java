package com.footballbooking.util;

import java.util.HashMap;
import java.util.Map;

public class ResponseUtil {
	
	public static Map<String, Object> createResponse(Boolean isSuccess, Object data, String message){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", isSuccess);
		result.put("data", data);
		result.put("message", message);
		return result;
	}
	
	public static Map<String, Object> createResponse(Boolean isSuccess, Object data, int itemTotal, String message){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", isSuccess);
		result.put("data", data);
		result.put("itemTotal", itemTotal);
		result.put("message", message);
		return result;
	}
}
