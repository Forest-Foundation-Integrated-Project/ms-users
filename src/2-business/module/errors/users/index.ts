export const UserCreationFailed = {
  code: 'USC-001',
  message: 'User creation failed',
  shortMessage: 'userCreationFailed'
}

export const UserViewingFailed = {
  code: 'USC-002',
  message: 'User viewing failed',
  shortMessage: 'userViewingFailed'
}

export const UserRemovalFailed = {
  code: 'USC-003',
  message: 'User removal failed',
  shortMessage: 'userRemovalFailed'
}

export const UserUpdateFailed = {
  code: 'USC-004',
  message: 'User update failed',
  shortMessage: 'userUpdateFailed'
}

export const UserNotFound = {
  code: 'USC-005',
  message: 'User not found',
  shortMessage: 'userNotFound'
}

export const CreationUserIdentityServiceFail = (details: Object) => ({
  code: 'USC-005',
  message: 'Creation user identity service fail',
  shortMessage: 'CreationUserIdentityServiceFail',
  details
})

export const UserIdentityCannotBeValidated = {
  code: 'UCV-001',
  message: "Suspicious activity, user identity cannot be validated.",
  shortMessage: 'UserIdentityCannotBeValidated.'
}

export const ImageUploadFailed = {
  code: 'IUF-001',
  message: 'Image upload failed.',
  shortMessage: 'imageUploadFailed'
}

export const FileExtensionIsNotSupported = {
  code: 'IUF-002',
  message: 'Image file extension is not supported.',
  shortMessage: 'fileExtensionIsNotSupported'
}
