import { useEffect } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useAppDispatch } from 'state/hooks'

import { ApplicationModal, setOpenModal } from '../../state/application/actions'

// Redirects to swap but only replace the pathname
export function RedirectPathToNFTOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/nft/:nftId' }} />
}

// Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format
export function RedirectToNFT(props: RouteComponentProps<{ outputCurrency: string }>) {
  const {
    location: { search },
    match: {
      params: { outputCurrency },
    },
  } = props

  return (
    <Redirect
      to={{
        ...props.location,
        pathname: '/analytics',
        search:
          search && search.length > 1
            ? `${search}&outputCurrency=${outputCurrency}`
            : `?outputCurrency=${outputCurrency}`,
      }}
    />
  )
}

export function OpenClaimAddressModalAndRedirectToNFT(props: RouteComponentProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setOpenModal(ApplicationModal.ADDRESS_CLAIM))
  }, [dispatch])
  return <RedirectPathToNFTOnly {...props} />
}
