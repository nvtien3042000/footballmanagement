package com.footballbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.AddressDao;

@Service
public class AddressService {
	
	@Autowired
	private AddressDao addressDao;
	
	public int referAddress(String city, String commune, String district, String street, String number) {
		return addressDao.referAddress(city, commune, district, street, number);
	}
}
