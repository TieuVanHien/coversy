import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, IconButton, Button } from "@mui/material";
import { Edit, LocationOn, Phone, Email } from "@mui/icons-material";
import { LogoutUser } from "redux/user";
import { AdminProfile, UserProfile } from "components";

export const Profile = () => {
    const user = useSelector((state) => state.userSlice.user);

    return (
        <section className="profile">
            <div className="card container">
                <div className="col left">
                    <Avatar
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                            fontSize: "4em",
                            width: "2.5em",
                            height: "2.5em",
                        }}
                    >
                        {user.firstName?.charAt(0)} {user.lastName?.charAt(0)}
                    </Avatar>
                    <IconButton
                        sx={{
                            marginRight: "-5.8em",
                            marginTop: "-2em",
                        }}
                    >
                        <Edit color="primary" />
                    </IconButton>
                    <div className="block name">
                        <h3>
                            {user.firstName} {user.lastName}
                        </h3>
                        <IconButton
                            sx={{
                                marginRight: "-1.5em",
                            }}
                        >
                            <Edit color="primary" />
                        </IconButton>
                    </div>
                    <div className="divider"></div>
                    <div className="block detail">
                        <LocationOn color="primary" />
                        <p>{user.site}</p>
                    </div>
                    {user.phone && (
                        <div className="block detail">
                            <Phone color="primary" />
                            <p>{user.phone}</p>
                        </div>
                    )}
                    <div className="block detail">
                        <Email color="primary" />
                        <p>{user.email}</p>
                    </div>
                    <Button
                        className="logout-btn"
                        onClick={() => {
                            <Navigate to="/login" />;
                            LogoutUser();
                        }}
                    >
                        Logout
                    </Button>
                </div>
                <div className="col right">
                    {user.type === 1 ? <AdminProfile /> : <UserProfile />}
                </div>
            </div>
        </section>
    );
};
