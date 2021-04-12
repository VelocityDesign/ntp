import React from "react"
import { Weather } from "../Weather"
import { Backgrounds } from "../Backgrounds"
import { DAT } from "../DAT"
import { Container, SettingsHeader, SettingsPanel, Title, Close, Section, SectionHeader, SectionTitle, CategoryBackgroundIcon, CategoryDATIcon, CategoryWeatherIcon } from "./style"

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

                <Section>
                    <SectionHeader>
                        <CategoryWeatherIcon />
                        <SectionTitle>Weather</SectionTitle>
                    </SectionHeader>
                    <Weather />
                </Section>
            </Container>
        </SettingsPanel>
    )
}