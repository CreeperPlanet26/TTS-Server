import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as DiscordStrategy, Profile } from "passport-discord";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.schema";
import { environment } from "src/environment/environment";


@Injectable()
export class AuthStrategy extends PassportStrategy(DiscordStrategy) {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: environment.REDIRECT_URL,
            scope: ["identify", "guilds"],
        });
    }

    public validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: Error, user?: User) => void): Promise<User> {
        console.log('validating...')
        return this.authService.validateUser(accessToken, refreshToken, profile, done);
    }
}