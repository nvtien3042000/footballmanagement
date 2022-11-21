package com.footballbooking.dao;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.footballbooking.entity.Address;

@Repository
public class AddressDao extends EntityDao<Address>{

	public int referAddress(String city, String commune, String district, String street, String number) {
		String sql = "SELECT address_id FROM footballbooking.address WHERE city = '" + city
				+"' AND district = '" + district
				+"' AND commune = '" + commune
				+"' AND street = '" + street
				+"' AND number = '" + number + "'";
		NativeQuery<Address> query = openSession().createNativeQuery(sql, Address.class);
		return query.getResultList().size();
	}

}
