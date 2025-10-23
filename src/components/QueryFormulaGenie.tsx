import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Copy, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/codegen';

type PlatformType = 'mysql' | 'postgresql' | 'sqlserver' | 'excel' | 'googlesheets';
type QueryType = 'regex' | 'substring';

export const QueryFormulaGenie: React.FC = () => {
  const { toast } = useToast();
  const [platform, setPlatform] = useState<PlatformType>('mysql');
  const [tableName, setTableName] = useState('');
  const [columnName, setColumnName] = useState('');
  const [queryType, setQueryType] = useState<QueryType>('regex');
  const [pattern, setPattern] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const generateQuery = () => {
    if (!tableName || !columnName || !pattern) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields to generate your query or formula.',
        variant: 'destructive',
      });
      return;
    }

    let code = '';

    if (platform === 'mysql') {
      if (queryType === 'regex') {
        code = `SELECT * FROM ${tableName} WHERE ${columnName} REGEXP '${pattern}';`;
      } else {
        const [start, length] = pattern.split(',').map(s => s.trim());
        code = `SELECT * FROM ${tableName} WHERE SUBSTRING(${columnName}, ${start}, ${length}) IS NOT NULL;`;
      }
    } else if (platform === 'postgresql') {
      if (queryType === 'regex') {
        // PostgreSQL regex extraction with SUBSTRING FROM
        code = `SELECT SUBSTRING(${columnName} FROM '${pattern}') AS extracted FROM ${tableName};`;
      } else {
        const [start, length] = pattern.split(',').map(s => s.trim());
        code = `SELECT SUBSTRING(${columnName}, ${start}, ${length}) AS extracted FROM ${tableName};`;
      }
    } else if (platform === 'sqlserver') {
      if (queryType === 'regex') {
        code = `-- SQL Server doesn't have native regex, use LIKE or PATINDEX\nSELECT * FROM ${tableName} WHERE ${columnName} LIKE '%${pattern}%';`;
      } else {
        const [start, length] = pattern.split(',').map(s => s.trim());
        code = `SELECT * FROM ${tableName} WHERE SUBSTRING(${columnName}, ${start}, ${length}) IS NOT NULL;`;
      }
    } else if (platform === 'excel') {
      if (queryType === 'regex') {
        code = `=TEXTJOIN(",", TRUE, FILTER(${columnName}2:${columnName}100, ISNUMBER(SEARCH("${pattern}", ${columnName}2:${columnName}100))))`;
      } else {
        const [start, length] = pattern.split(',').map(s => s.trim());
        code = `=MID(${columnName}2, ${start}, ${length})`;
      }
    } else if (platform === 'googlesheets') {
      if (queryType === 'regex') {
        code = `=FILTER(${columnName}2:${columnName}, REGEXMATCH(${columnName}2:${columnName}, "${pattern}"))`;
      } else {
        const [start, length] = pattern.split(',').map(s => s.trim());
        code = `=MID(${columnName}2, ${start}, ${length})`;
      }
    }

    setGeneratedCode(code);
    toast({
      title: '✨ Query Generated!',
      description: 'Your query or formula is ready to use.',
    });
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedCode);
    if (success) {
      toast({
        title: 'Copied!',
        description: 'Query copied to clipboard.',
      });
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Query Genie
        </CardTitle>
        <CardDescription>
          Effortlessly generate database queries or spreadsheet formulas using Regex or Substring
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="platform">DB / Platform Type</Label>
            <Select value={platform} onValueChange={(value) => setPlatform(value as PlatformType)}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="sqlserver">SQL Server</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="googlesheets">Google Sheets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tableName">Table / Sheet Name</Label>
            <Input
              id="tableName"
              placeholder="e.g., users, customers, Sheet1"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="columnName">Column / Range Name</Label>
            <Input
              id="columnName"
              placeholder="e.g., email, A, B"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="queryType">Query / Formula Type</Label>
            <Select value={queryType} onValueChange={(value) => setQueryType(value as QueryType)}>
              <SelectTrigger id="queryType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regex">🔍 Regex (Pattern Matching)</SelectItem>
                <SelectItem value="substring">✂️ Substring (Extract Text)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="pattern">
              {queryType === 'regex' ? 'Regular Expression Pattern' : 'Range (start,length)'}
            </Label>
            <Input
              id="pattern"
              placeholder={
                queryType === 'regex'
                  ? 'e.g., checkoutDate=(.*?)&'
                  : 'e.g., 1,5'
              }
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {queryType === 'regex'
                ? '💡 Tip: Regex = 🔍 powerful pattern matching'
                : '💡 Tip: Substring = ✂️ extract the juiciest bits!'}
            </p>
          </div>
        </div>

        <Button onClick={generateQuery} className="w-full" size="lg">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Query / Formula
        </Button>

        {generatedCode && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Generated Code</Label>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="relative">
              <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
