package com.footballbooking.dao;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.util.comparator.Comparators;

import com.footballbooking.entity.Booking;
import com.footballbooking.entity.BookingStatus;
import com.footballbooking.util.DateUtil;

@Repository
public class BookingDao extends EntityDao<Booking>{
	
	public Booking getById (Integer bookingId) {
		return super.getById(Booking.class, bookingId);
	}
	
	public List<Booking> getBookingByBookingDataAndHour (LocalDate bookingDate, LocalTime timeSlot) {
		String sql = "SELECT * FROM booking WHERE booking_date = :bookingDate AND hour_start <= CAST(:timeSlot AS time) AND hour_end > CAST(:timeSlot AS time)";
		NativeQuery<Booking> query = openSession().createNativeQuery(sql, Booking.class)
							.setParameter("bookingDate", DateUtil.convertLocalDateToString(bookingDate, "yyyy-MM-dd"))
							.setParameter("timeSlot", DateUtil.convertLocalTimeToString(timeSlot, "HH:mm:ss"));
		return query.getResultList();
	}
	
	public boolean checkBookedMiniPitchByBookingDateAndTime(int miniPitchId, LocalDate bookingDate, LocalTime hourStart) {
		String sql = "SELECT * FROM booking WHERE minipitch_id = :miniPitchId AND booking_date = :bookingDate AND hour_start <= CAST(:timeSlot AS time) AND hour_end > CAST(:timeSlot AS time)";
		NativeQuery<Booking> query = openSession().createNativeQuery(sql, Booking.class)
							.setParameter("bookingDate", DateUtil.convertLocalDateToString(bookingDate, "yyyy-MM-dd"))
							.setParameter("timeSlot", DateUtil.convertLocalTimeToString(hourStart, "HH:mm:ss"))
							.setParameter("miniPitchId", miniPitchId);
		return query.getResultList().size() > 0;
	}
	
	public void insert (Booking booking) {
		super.insert(booking);
	}
	
	public List<Booking> getWaitingBooking (List<Integer> miniPitchIds, Integer status){
		String sql = "SELECT * FROM booking WHERE minipitch_id IN (:miniPitchIds)";
		NativeQuery<Booking> query = openSession().createNativeQuery(sql, Booking.class)
						.setParameterList("miniPitchIds", miniPitchIds);
		List<Booking> bookings = query.getResultList();
//		bookings.sort(Comparator.comparing(b->((BookingStatus) b.getBookingStatuses().get(0)).getCreateAt()));
		List<Booking> result = new ArrayList<Booking>();
		for (Booking booking : bookings) {
			List<BookingStatus> bookingStatuses = booking.getBookingStatuses();
			if(status == 1) {
				if (bookingStatuses.size() == 1 && bookingStatuses.get(0).getStatus().getStatusId() == status) {
					result.add(booking);
				}
			} else {
				if (bookingStatuses.size() > 1 && bookingStatuses.get(bookingStatuses.size()-1).getStatus().getStatusId() == status) {
					result.add(booking);
				}
			}
			
		}
		return result;
	}
	
	public List<Booking> getByUserId (Integer userId) {
		String sql = "SELECT * FROM booking WHERE user_id = :userId";
		NativeQuery<Booking> query = openSession().createNativeQuery(sql, Booking.class)
					.setParameter("userId", userId);
		return query.getResultList();
	}
	
}
