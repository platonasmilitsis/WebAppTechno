package com.hitit.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class Users {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String first_name;
    private String last_name;
    private String telephone;
    private String email;
    private String address;
    private String tin;
    private Boolean admin;
    private Boolean accepted;


    public Users() {
    }

    public Users(String username, String password,
                 String first_name, String last_name,
                 String telephone, String email,
                 String address, String TIN,
                 Boolean admin, Boolean accepted) {
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.telephone = telephone;
        this.email = email;
        this.address = address;
        this.tin = TIN;
        this.admin = admin;
        this.accepted = accepted;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTIN() {
        return tin;
    }

    public void setTIN(String TIN) {
        this.tin = TIN;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public void setAccepted() {this.accepted = true;}


    public void setTin(String tin) {
        this.tin = tin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }




    public String getTin() {
        return tin;
    }

    public void setDummyUser(String username) {
        this.username = username;
        this.password = "1234";
        this.admin = false;
        this.accepted = true;
        this.address = "Kapous";
        this.first_name = "Dummy User";
        this.last_name = username;
        this.telephone = "2100200";
        this.email = "dummy" + username + "@email.com";
        this.tin = "1234";
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", telephone='" + telephone + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", tin='" + tin + '\'' +
                ", admin=" + admin +
                ", accepted=" + accepted +
                '}';
    }
}
