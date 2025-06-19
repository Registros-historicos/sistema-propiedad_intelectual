import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  userProfile: any = {};

  constructor() {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      this.userProfile = JSON.parse(storedUser);
    } else {
      this.userProfile = {
        id: 1,
        username: "admin",
        password: "demo",
        email: "admin@demo.com",
        authToken: "auth-token-8f3ae836da744329a6f93bf20594b5cc",
        refreshToken: "auth-token-f8c137a2c98743f48b643e71161d90aa",
        roles: [1],
        pic: "./assets/media/avatars/300-1.jpg",
        fullname: "Sean S",
        firstname: "Sean",
        lastname: "Stark",
        occupation: "CEO",
        companyName: "Keenthemes",
        phone: "456669067890",
        language: "en",
        timeZone: "International Date Line West",
        website: "https://keenthemes.com",
        communication: { email: true, sms: true, phone: false },
        address: {
          addressLine: "L-12-20 Vertex, Cybersquare",
          city: "San Francisco",
          state: "California",
          postCode: "45000"
        },
        socialNetworks: {
          linkedIn: "https://linkedin.com/admin",
          facebook: "https://facebook.com/admin",
          twitter: "https://twitter.com/admin",
          instagram: "https://instagram.com/admin"
        }
      };
    }

    console.log('User profile loaded:', this.userProfile);
  }
}