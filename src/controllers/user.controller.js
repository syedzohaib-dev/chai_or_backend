import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from "../models/user.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user dtails from frontend
    // validation - not epmty
    // check if user already exists: usrname - email
    // check for image, check for avatar
    // upload them to cloudinary
    // create user object - creation entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { fullname, email, username, password } = req.body
    console.log(fullname, email, username, password)

    if (
        [fullname, email, username, password].some((field) =>
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All Field Are Required")
    }

    //  // // //

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or  username already exist")
    }

    req.files?.avatar

})



export { registerUser }