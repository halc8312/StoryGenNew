import React from 'react';
import Split from 'react-split';
import * as Tabs from '@radix-ui/react-tabs';
import CharacterList from '../character/CharacterList';
import PlotlineManager from '../plotline/PlotlineManager';
import StoryGenerator from '../story/StoryGenerator';
import ConsistencyChecker from '../consistency/ConsistencyChecker';
import { useCharacter } from '../../contexts/CharacterContext';
import { usePlotline } from '../../contexts/PlotlineContext';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';
import './StoryEditorSidebar.css';

const StoryEditorSidebar = ({ apiKey }) => {
  const { characters } = useCharacter();
  const { plotlines } = usePlotline();
  const { currentStory } = useStoryHistory();

  return (
    <div className="story-editor-layout">
      <Split
        sizes={[30, 70]}
        minSize={300}
        maxSize={800}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="story-editor-split"
      >
        <div className="sidebar-panel">
          <Tabs.Root defaultValue="characters" className="sidebar-tabs">
            <Tabs.List className="tabs-list">
              <Tabs.Trigger value="characters" className="tab-trigger">
                キャラクター
              </Tabs.Trigger>
              <Tabs.Trigger value="plotlines" className="tab-trigger">
                伏線
              </Tabs.Trigger>
              <Tabs.Trigger value="consistency" className="tab-trigger">
                一貫性チェック
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="characters" className="tab-content">
              <CharacterList />
            </Tabs.Content>

            <Tabs.Content value="plotlines" className="tab-content">
              <PlotlineManager />
            </Tabs.Content>

            <Tabs.Content value="consistency" className="tab-content">
              <ConsistencyChecker 
                story={currentStory}
                characters={characters}
                plotlines={plotlines}
                apiKey={apiKey}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div className="main-content-panel">
          <StoryGenerator apiKey={apiKey} />
        </div>
      </Split>
    </div>
  );
};

export default StoryEditorSidebar;