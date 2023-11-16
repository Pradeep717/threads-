import jwt from 'jsonwebtoken'

const generateTokenANdCookie = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: '15d'})

    res.cookie("jwt", token, {
        httpOnly: true, // This prevents the cookie from being accessed by javascript
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite:"strict"  // The cookie will only be sent in a first-party context and not be sent along with requests initiated by third party websites
    })
    return token;
}

export default generateTokenANdCookie;