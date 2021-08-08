import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Heading,
  Radio,
  RadioGroup,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Flex,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Card } from "../atoms/Card";
import { Setting, EthereumNetworkOptions } from "../config";
import { useEthereum } from "../contexts/EthereumContext";
import { useSettings } from "../contexts/SettingsContext";
import { layoutConfig } from "../layoutConfig";
import { debounce } from "../utils/debounce";
import { navigateToSubdomain } from "../utils/subdomain";

export function Settings() {
  const { eth } = useEthereum()
  const firstFieldRef = useRef(null);
  const settings = useSettings();
  const [maxBlocksToRender, setMaxBlocksToRender] = useState<number>(
    settings.get(Setting.maxBlocksToRender)
  );
  const [maxBlocksToChart, setMaxBlocksToChart] = useState<number>(
    settings.get(Setting.maxBlocksToChart)
  );

  const debouncedSetMaxBlocksToRender = useMemo(
    () => debounce((value: number) => settings.set(Setting.maxBlocksToRender, value), 300),
    [settings]
  );

  const debouncedSetMaxBlocksToChart = useMemo(
    () => debounce((value: number) => settings.set(Setting.maxBlocksToChart, value), 300),
    [settings]
  );

  useEffect(() => {
    debouncedSetMaxBlocksToRender(maxBlocksToRender);
  }, [debouncedSetMaxBlocksToRender, maxBlocksToRender]);

  useEffect(() => {
    debouncedSetMaxBlocksToChart(maxBlocksToChart);
  }, [debouncedSetMaxBlocksToChart, maxBlocksToChart]);

  const changeNetwork = (network: string) => {
    navigateToSubdomain(network)
  }

  return (
    <Flex flex="1" direction="column" m={layoutConfig.gap} gridGap={layoutConfig.gap}>
      <Breadcrumb>
        <BreadcrumbItem fontSize="lg" fontWeight="bold">
          <BreadcrumbLink as={ReactLink} to="/blocks">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text>Settings</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card mt="2" title="Ethereum Network">
        <RadioGroup
          onChange={changeNetwork}
          defaultValue={eth?.connectedNetwork.key}
          ref={firstFieldRef}
        >
          <Flex direction={['column', 'column', 'row']} gridGap={4}>
            <Radio value={EthereumNetworkOptions.mainnet.key}>{EthereumNetworkOptions.mainnet.name}</Radio>
          </Flex>
        </RadioGroup>
      </Card>

      <Card mt="2" title="Max Blocks">
        <Heading size="sm" color="brand.secondaryText">In Table</Heading>
        <Flex>
          <NumberInput maxW="100px" mr="2rem" value={maxBlocksToRender} min={5} max={100} onChange={(_, value) => setMaxBlocksToRender(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider flex="1" focusThumbOnChange={false} value={maxBlocksToRender} min={5} max={100} onChange={setMaxBlocksToRender}>
            <SliderTrack>
              <SliderFilledTrack bg="brand.orange" />
            </SliderTrack>
            <SliderThumb fontSize="sm" boxSize="32px" color="brand.orange" children={maxBlocksToRender} />
          </Slider>
        </Flex>

        <Heading size="sm" color="brand.secondaryText">In Chart</Heading>
        <Flex>
          <NumberInput maxW="100px" mr="2rem" value={maxBlocksToChart} min={5} max={1000} onChange={(_, value) => setMaxBlocksToChart(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider flex="1" focusThumbOnChange={false} value={maxBlocksToChart} min={5} max={1000} onChange={setMaxBlocksToChart}>
            <SliderTrack>
              <SliderFilledTrack bg="brand.orange" />
            </SliderTrack>
            <SliderThumb fontSize="sm" boxSize="32px" color="brand.orange" children={maxBlocksToChart} />
          </Slider>
        </Flex>
      </Card>
    </Flex>
  );
}
