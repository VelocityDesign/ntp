import React from "react"
import { Backgrounds } from "../Backgrounds"
import { DAT } from "../DAT"
import { Container, SettingsHeader, SettingsPanel, Title, Close, Section, SectionHeader, SectionTitle, CategoryBackgroundIcon, CategoryDATIcon } from "./style"

export const Settings = ({ visible, children }: { visible: boolean; children: any }) => {
    return (
        <SettingsPanel visible={visible}>
            {children}
            <Container>
                <Section>
                    <SectionHeader>
                        <CategoryBackgroundIcon />
                        <SectionTitle>Background</SectionTitle>
                    </SectionHeader>
                    <Backgrounds />
                </Section>

                <Section>
                    <SectionHeader>
                        <CategoryDATIcon />
                        <SectionTitle>Date &amp; Time</SectionTitle>
                    </SectionHeader>
                    <DAT />
                </Section>
            </Container>
        </SettingsPanel>
    )
}