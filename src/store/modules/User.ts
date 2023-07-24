interface UserInfo {
    id?: string
    headUrl?: string
    username: string
    token: string
    role: "user" | "admin"
    lastlogin?: Date,
    expire: Date
}
export default UserInfo;