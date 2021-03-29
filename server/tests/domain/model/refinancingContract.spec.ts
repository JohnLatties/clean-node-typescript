import { RefinancingContract } from '../../../src/domain/models/refinancingContract/RefinancingContract'
import { RefinancingProposalData } from '../../../src/domain/models/refinancingProposal/RefinancingProposalData'
import { InvalidRefinancingProposalError } from '../../../src/domain/share/errors/InvalidRefinancingProposalError'
import { InvalidPaymentPlan } from '../../../src/domain/share/errors/InvalidPaymentPlan'

const invalidaProposal: RefinancingProposalData = {
  key: '',
  createdAt: new Date('2021-03-28T19:31:30.826Z'),
  updatedAt: new Date('2021-03-28T19:31:30.826Z'),
  proposalNumber: '',
  carBrand: {
    key: '0a06e733-a952-467e-850b-5e1e1f8c38c3',
    name: 'Acura',
    image: 'https://static.wixstatic.com/media/b00f6a_33d9b2dc534d415fafc24a9af26bdc85~mv2.png'
  },
  car: {
    key: 'fecfe64c-307c-4d20-9e57-7ebce9b8fe1d',
    name: 'Acura ILX 2019',
    price: 23416,
    image: 'http://media.chromedata.com/autoBuilderData/stockPhotos/30821.jpg'
  },
  apr: 10,
  paymentOptions: [
    {
      value: 845.58,
      months: 36
    },
    {
      value: 682.97,
      months: 48
    }
  ]
}

const validaProposal: RefinancingProposalData = {
  key: 'e29e1611-f35c-411e-b185-4f626d451db9',
  createdAt: new Date('2021-03-28T19:31:30.826Z'),
  updatedAt: new Date('2021-03-28T19:31:30.826Z'),
  proposalNumber: '#1616959890826',
  carBrand: {
    key: '0a06e733-a952-467e-850b-5e1e1f8c38c3',
    name: 'Acura',
    image: 'https://static.wixstatic.com/media/b00f6a_33d9b2dc534d415fafc24a9af26bdc85~mv2.png'
  },
  car: {
    key: 'fecfe64c-307c-4d20-9e57-7ebce9b8fe1d',
    name: 'Acura ILX 2019',
    price: 23416,
    image: 'http://media.chromedata.com/autoBuilderData/stockPhotos/30821.jpg'
  },
  apr: 10,
  paymentOptions: [
    {
      value: 845.58,
      months: 36
    },
    {
      value: 682.97,
      months: 48
    }
  ]
}

describe('RefinancingProposal', () => {
  test('Should not create RefinancingProposal with invalida proposal', () => {
    const paymentPLan = validaProposal.paymentOptions[0]
    const refinancingProposalOrError = RefinancingContract.create(invalidaProposal, paymentPLan)

    expect((refinancingProposalOrError.value as InvalidRefinancingProposalError).message).toMatch(/Invalid proposal key:/)
  })

  test('Should not create RefinancingProposal with invalida paymentPlan', () => {
    const paymentPLan = { value: 0, months: 0 }
    const refinancingProposalOrError = RefinancingContract.create(validaProposal, paymentPLan)

    expect((refinancingProposalOrError.value as InvalidPaymentPlan).message).toMatch(/The payment, with value: 0 and months: 0 is invalid./)
  })

  test('Should create RefinancingProposal if wall data os corremct', () => {
    const paymentPLan = validaProposal.paymentOptions[0]
    const refinancingProposalOrError = RefinancingContract.create(validaProposal, paymentPLan)

    expect(refinancingProposalOrError.Fulfilled()).toBe(true)

    expect((refinancingProposalOrError.value as RefinancingContract).key).not.toBeNull()
  })
})
