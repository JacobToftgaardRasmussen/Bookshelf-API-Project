import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library"

class ErrorHandler {
  public handleError(error: unknown): { status: number; message: string } {
    const unexpectedError = {
      status: 500,
      message: "Sorry something unexpected happened",
    }

    if (error instanceof PrismaClientValidationError) {
      // This type of prisma error indicates that the input had a wrong format and could not be validated
      return {
        status: 400,
        message: "The input was invalid",
      }
    } else if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025":
          return { status: 400, message: "The book was not found" }
        default:
          return unexpectedError
      }
    } else {
      return unexpectedError
    }
  }
}

export default new ErrorHandler()
