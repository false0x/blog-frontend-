import { NextPage } from "next"
import { PropsWithChildren } from "react"

export type TypeRole = {
    isOnlyAdmin?: boolean
}

export type NextPageAuth<P={}> = NextPage<P> & TypeRole

export type TypeComponentAuthFields = {
    Component: TypeRole
} & PropsWithChildren