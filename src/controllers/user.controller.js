import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from "../models/user.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { Apiresponse } from '../utils/apiResponse.js'
import { connect } from 'http2';


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating and access token")
    }
}

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
    // console.log(fullname, email, username, password)

    if (
        [fullname, email, username, password].some((field) =>
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All Field Are Required")
    }

    //  // // //

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or  username already exist")
    }
    // console.log(req.files)

    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverimage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "soomething went wrong white registring the user")

    }

    return res.status(201).json(
        new Apiresponse(200, createdUser, "User register Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    // req body => data
    // username or email 
    // find the user
    // password check
    // access and refresh token
    // send cookie 

    const { email, username, password } = req.body

    if (!username || !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)  // ye password hmne ne req.body se nikala he

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user cradentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await user.findById(user._id).select("-password -refreshToken")

    const options = {
        httponly: true,
        secure: true
    }  // ye krne ka faida he ke ye sirf server se modify hogi frontend se nhi hogi

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new Apiresponse(
                200,
                {
                    user: loggedInUser, accessToken,
                    refreshToken
                },
                "User logged In Successfully"
            )
        )


})


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httponly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new Apiresponse(200, {}, "User logged Out"))
})


export { registerUser, loginUser, logoutUser }