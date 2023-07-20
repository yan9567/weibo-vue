interface UserInfo {
    ID?: string
    headUrl?: string
    username: string
    token: string
    role: "user" | "admin"
    lastlogin?: Date
}
export default UserInfo;