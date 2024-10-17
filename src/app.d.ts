import "reflect-metadata";
import './app.css'
import { UserDto } from "./lib/dtos/user.dto";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user:UserDto
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
