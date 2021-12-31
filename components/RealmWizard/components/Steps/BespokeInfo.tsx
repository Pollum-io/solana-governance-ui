/* eslint-disable @typescript-eslint/no-unused-vars */
import Divider from '@components/Divider'
import Input from '@components/inputs/Input'
import { StyledLabel } from '@components/inputs/styles'
import { formatMintNaturalAmountAsDecimal } from '@tools/sdk/units'
import React from 'react'
import { RealmWizardStepComponentProps } from '../../interfaces/Realm'
import ApprovalQuorumInput from '../ApprovalQuorumInput'

const BespokeInfo: React.FC<RealmWizardStepComponentProps> = ({
  setForm,
  form,
  formErrors,
}) => {
  return (
    <>
      <div className="border-b border-fgd-4 pb-4 pt-2">
        <div className="flex items-center justify-between">
          <h1>Realm summary</h1>
        </div>
      </div>
      <div>
        <div>
          <div className="pt-2">
            <div className="pb-4 pr-10 mr-2">
              <Input
                readOnly
                label="Name"
                placeholder="Name of your realm"
                value={form.name}
                error={formErrors['name']}
                type="text"
                disabled
                className="border-none py-1 bg-transparent"
              />
            </div>

            <div className="pr-10 mr-2">
              <Input
                disabled
                className="border-none py-1 bg-transparent"
                readOnly
                label="Community Token Mint"
                placeholder="-"
                error={
                  formErrors['communityMintId'] || formErrors['communityMint']
                }
                value={
                  !form?.communityMintId
                    ? "We'll generate for you"
                    : form.communityMintId
                }
                type="text"
              />
              {form?.communityMint && (
                <div className="pt-2">
                  <div className="pb-0.5 text-fgd-3 text-xs">Mint supply</div>
                  <div className="text-xs">
                    {formatMintNaturalAmountAsDecimal(
                      form.communityMint.account,
                      form.communityMint.account.supply
                    )}
                  </div>
                </div>
              )}
            </div>
            <Divider dashed />
            {form?.communityMint && (
              <>
                <div className="pb-4 pr-10 mr-2">
                  <Input
                    disabled
                    className="border-none py-1 bg-transparent"
                    readOnly
                    label="Min community tokens to create governance (defaults 1% of community mint)"
                    placeholder="Min community tokens to create governance"
                    step="0.01"
                    value={form.minCommunityTokensToCreateGovernance}
                    error={formErrors['minCommunityTokensToCreateGovernance']}
                    type="number"
                  />
                </div>
                <div className="pb-4 pr-10 mr-2">
                  <Input
                    disabled
                    className="border-none py-1 bg-transparent"
                    readOnly
                    label="Community mint supply factor (max vote weight)"
                    placeholder="Community mint supply factor (max vote weight)"
                    value={form.communityMintMaxVoteWeightSource}
                    error={formErrors['communityMintMaxVoteWeightSource']}
                    type="number"
                  />
                </div>
              </>
            )}
            <div className="pb-4 pr-10 mr-2">
              <div className="flex flex-col relative w-full">
                <StyledLabel>Governance Program Id</StyledLabel>
                <div className="flex align-center">
                  <div
                    className="bg-gray-700 px-3 py-2 rounded"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {form?.governanceProgramId}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 pr-10 mr-2">
              <Input
                disabled
                className="border-none py-1 bg-transparent"
                readOnly
                label="Governance program version"
                placeholder={1}
                value={'V' + (form?.programVersion ?? 1)}
                error={formErrors['programVersion']}
                type="text"
              />
            </div>
          </div>
        </div>
        <Divider dashed />
        <div className="pr-2">
          {form.teamWallets?.length ? (
            <>
              <div className="pb-7 pr-10 w-full">
                <Input
                  disabled
                  className="border-none py-1 bg-transparent"
                  readOnly
                  label="Council token mint"
                  placeholder="(Optional) Council mint"
                  error={
                    formErrors['councilMintId'] || formErrors['councilMint']
                  }
                  value={
                    !form?.councilMintId
                      ? "We'll generate for you"
                      : form.councilMintId
                  }
                  type="text"
                />
              </div>
              <div className="pr-10 w-full border-">
                <Input
                  disabled
                  className="border-none py-1 bg-transparent"
                  readOnly
                  label="Approval quorum (%)"
                  placeholder="60"
                  value={form?.yesThreshold + '%'}
                  type="text"
                />
              </div>
              <Divider dashed />
              <div className="team-wallets-wrapper">
                <StyledLabel className="pb-5">Team wallets</StyledLabel>
                {form.teamWallets?.map((wallet, index) => (
                  <div
                    className="flex flex-col relative w-full pb-5"
                    key={index}
                  >
                    <StyledLabel>Member {index + 1}:</StyledLabel>
                    <div className="flex align-center">
                      <div
                        className="bg-gray-700 px-3 py-2 rounded"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {wallet}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default BespokeInfo
