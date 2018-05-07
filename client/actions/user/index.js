import * as userTypes from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import usersApiClient from '../../api/users'
import ApplyForProjectException from '../../exceptions/ApplyForProjectException'

export const updateUser = { type: userTypes.UPDATE_USER }

export const uploadingProfilePicture = { type: userTypes.UPLOADING_PROFILE_PICTURE }
export const failedUploadingProfilePicture = { type: userTypes.FAILED_UPLOADING_PROFILE_PICTURE }
export const successUploadingProfilePicture = { type: userTypes.SUCCESS_UPLOADING_PROFILE_PICTURE }

export const updatingProfilePicture = { type: userTypes.UPDATE_PROFILE_PICTURE }
export const failedUpdatingProfilePicture = { type: userTypes.FAILED_UPDATING_PROFILE_PICTURE }

export default class UserActionCreator {
  static applyForProject (project, user) {
    return async (dispatch, getState) => {
      try {
        const projectId = project.id
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const updatedUser = await usersApiClient.applyForProject(apiOptions, projectId)

        dispatch({
          ...updateUser,
          payload: updatedUser
        })
      } catch (e) {
        console.trace(e)
        throw new ApplyForProjectException(e.status)
      }
    }
  }

  static updateProfilePicture (file) {
    return async (dispatch, getState) => {
      const filename = file.name.replace(/(\.[\w\d_-]+)$/i, '_profilePicture_' + Date.now() + '$1')
      const state = getState()
      const apiOptions = apiOptionsFromState(state)

      // try uploading image to server
      dispatch(uploadingProfilePicture)
      try {
        const url = await usersApiClient.getPresignedUrlForUserProfilePicture(apiOptions, filename)
        await usersApiClient.uploadImage(apiOptions, url, file)
      } catch (e) {
        console.log(e)
        dispatch(failedUploadingProfilePicture)
      }
      dispatch(successUploadingProfilePicture)

      // try updating user profile picture in db
      dispatch(updatingProfilePicture)
      try {
        const updatedUser = await usersApiClient.updateUserProfilePictureFilename(apiOptions, filename)

        dispatch({
          ...updateUser,
          payload: updatedUser
        })
      } catch (e) {
        console.log(e)
        dispatch(failedUpdatingProfilePicture)
      }
    }
  }
}
