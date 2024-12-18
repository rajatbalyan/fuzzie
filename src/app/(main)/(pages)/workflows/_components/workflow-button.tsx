'use client'

import WorkflowForm from '@/components/forms/workflow-form'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const WorkflowButton = (props: Props) => {
    const { setOpen, setClose } = useModal()

    const handleClick = () => {
        setOpen(
          <CustomModal
            title="Create a Workflow Automation"
            subheading="Workflows are a powerfull that help you automate tasks."
          >
            <WorkflowForm />
          </CustomModal>
        )
      }

    return (
    <Button
      size={'icon'}
      onClick={handleClick}
    //   {...(credits !== '0'
    //     ? {
    //         onClick: handleClick,
    //       }
    //     : {
    //         disabled: true,
    //       })}
    >
      <Plus />
    </Button>
  )
}

export default WorkflowButton