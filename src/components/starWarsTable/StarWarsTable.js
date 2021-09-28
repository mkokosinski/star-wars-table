import { useMemo } from 'react'

import Table from 'components/common/table/Table'

import { PEOPLE_STATUS, useStarWarsData } from 'context/dataContext'
import { useUiContext } from 'context/uiContext'
import { getTableData, headers } from './helpers'
import EditModal from './editModal/EditModal'
import ActionsCell from './actions/ActionsCell'
import StatusInfo from './status/StatusInfo'
import NameCell from './name/NameCell'
import { MODAL_TYPE } from 'components/modal/constants'

const StarWarsTable = () => {
  const { data } = useStarWarsData()
  const { searchQuery, selectedHomeworlds, selectedSpecies, selectedStatus, showModal } =
    useUiContext()

  const filters = useMemo(
    () => ({ searchQuery, selectedHomeworlds, selectedSpecies, selectedStatus }),
    [searchQuery, selectedHomeworlds, selectedSpecies, selectedStatus],
  )

  const tableData = useMemo(() => getTableData(data, filters), [data, filters])
  const rows = tableData.map((hero) => ({
    meta: { id: hero.url, disabled: hero.status === PEOPLE_STATUS.DEACTIVATED },
    cols: [
      {
        key: 'name',
        title: `${hero.name} ${hero.species.join(', ')}`,
        content: <NameCell key={hero.url} name={hero.name} species={hero.species} />,
      },
      {
        key: 'born',
        title: hero.born,
        content: hero.born,
      },
      {
        key: 'homeworld',
        title: hero.homeworld,
        content: hero.homeworld,
      },
      {
        title: hero.vehiclesAndStarships.slice(0, 2).join(', '),
        content: hero.vehiclesAndStarships.slice(0, 2).join(', '),
      },
      {
        title: hero.status,
        content: <StatusInfo key={hero.url} status={hero.status} />,
      },
      {
        title: 'action',
        content: <ActionsCell handleEdit={() => showModal(MODAL_TYPE.EDIT, hero)} key={hero.url} />,
      },
    ],
  }))
  return (
    <>
      <EditModal />
      <Table headers={headers} rows={rows} />
    </>
  )
}

export default StarWarsTable
